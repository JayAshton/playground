package com.example.products

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import org.springframework.http.HttpStatus

@Service
class ProductService(private val repository: ProductRepository) {
    fun findAll(): List<Product> =
        repository.findAll()
    fun findByName(name: String): Product =
        repository.findByName(name)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Product '$name' not found")

    fun save(product: Product): Product = repository.save(product)
}