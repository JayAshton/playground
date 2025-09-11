package com.example.products

import net.datafaker.Faker
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Component
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.web.client.RestTemplate
import kotlin.random.Random

@Configuration class FakerConfig {
    @Bean
    fun faker(): Faker = Faker()
}

@Component
class DataLoader(
    private val productRepository: ProductRepository,
    private val faker: Faker
) : CommandLineRunner {

    @Value("\${reviews.service.url}")
    private val reviewsServiceUrl: String? = null

    override fun run(vararg args: String?) {
        val products = generateProducts(10)
        val savedProducts = productRepository.saveAll(products)
        println("*** ${savedProducts.size} sample products bootstrapped ***")

        loadReviews(savedProducts.toList())
    }

    private fun generateProducts(count: Int): List<Product> {
        return (1..count).map {
            Product(
                name = faker.commerce().productName(),
                description = faker.lorem().sentence(),
                price = faker.commerce().price().toDouble(),
                imageUrl = faker.internet().image(600, 400)
            )
        }
    }

    private fun loadReviews(products: List<Product>) {
        val restTemplate = RestTemplate()
        val headers = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
        }

        products.forEach { product ->
            val numberOfReviews = Random.nextInt(1, 4) // 1–3 reviews
            repeat(numberOfReviews) {
                val review: Map<String, Any?> = mapOf(
                    "rating" to Random.nextInt(1, 6), // rating 1–5
                    "description" to faker.lorem().sentence(),
                    "productId" to product.id.toString()
                )

                val entity = HttpEntity(review, headers)

                try {
                    sendReview(restTemplate, entity)
                } catch (e: Exception) {
                    println("Failed to create review: ${e.message}")
                }
            }
        }

        println("*** Sample reviews bootstrapped ***")
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
