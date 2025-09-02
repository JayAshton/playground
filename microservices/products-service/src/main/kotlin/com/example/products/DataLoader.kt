package com.example.products

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.boot.CommandLineRunner
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Component

@Component
class DataLoader(private val productRepository: ProductRepository) : CommandLineRunner {

    override fun run(vararg args: String?) {
        val resource = ClassPathResource("products.json")
        val mapper = jacksonObjectMapper()

        val products: List<Product> = mapper.readValue(resource.inputStream)

        productRepository.saveAll(products)
        println("***Sample products bootstrapped***")
    }
}
