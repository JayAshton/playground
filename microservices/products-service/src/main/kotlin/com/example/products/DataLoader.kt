package com.example.products

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.github.javafaker.Faker
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate

@Configuration
class FakerConfig {
    @Bean
    fun faker(): Faker = Faker()
}

@Component
class DataLoader(private val productRepository: ProductRepository, private val faker: Faker = Faker()) : CommandLineRunner {

    @Value("\${reviews.service.url}")
    private val reviewsServiceUrl: String? = null

    override fun run(vararg args: String?) {
        val resource = ClassPathResource("products.json")
        val mapper = jacksonObjectMapper()

        val products: List<Product> = mapper.readValue(resource.inputStream)

        val savedProducts = productRepository.saveAll(products)
        println("***Sample products bootstrapped***")

        loadReviews(savedProducts.toList())
    }

    private fun loadReviews(products: List<Product>) {
        val reviewsResource = ClassPathResource("reviews.json")
        val mapper = jacksonObjectMapper()

        val reviewData: List<Map<String, Any>> = mapper.readValue(reviewsResource.inputStream)

        val restTemplate = RestTemplate()
        val headers = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
        }

        reviewData.forEach { reviewMap ->
            val productIndex = reviewMap["productIndex"] as Int
            val product = products[productIndex]

            val review = mapOf(
                "rating" to reviewMap["rating"],
                "description" to "${reviewMap["description"]} for product: ${product.id}",
                "productId" to product.id.toString()
            )

            val entity = HttpEntity(review, headers)

            try {
                sendReview(restTemplate, entity)
            } catch (e: Exception) {
                println("Failed to create review: ${e.message}")
            }
        }
        println("***Sample reviews bootstrapped***")
    }

    fun sendReview(restTemplate: RestTemplate, entity: HttpEntity<Map<String, Any?>>) {
        var attempt = 0
        while (attempt < 3) {
            try {
                restTemplate.postForEntity("$reviewsServiceUrl/reviews", entity, String::class.java)
                return
            } catch (e: Exception) {
                attempt++
                println("Attempt $attempt failed: ${e.message}. Retrying in 5s...")
                Thread.sleep(5000)
            }
        }
        throw RuntimeException("Failed to post review after ${attempt} attempts")
    }
}