package com.example.products

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.boot.CommandLineRunner
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Component

@Component
class DataLoader(private val productRepository: ProductRepository) : CommandLineRunner {

    override fun run(vararg args: String?) {
        // Load JSON file from resources
        val resource = ClassPathResource("products.json")
        val mapper = jacksonObjectMapper()

        // Parse JSON into a List<Product>
        val products: List<Product> = mapper.readValue(resource.inputStream)

        // Save to repository
        productRepository.saveAll(products)
        println("***Sample products bootstrapped***")
    }
}
