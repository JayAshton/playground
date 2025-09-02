package com.example.products

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

    fun update(name: String, product: Product): Product {
        val existingProduct = repository.findByName(name)
        ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Product '$name' not found")

        existingProduct.name = product.name
        existingProduct.description = product.description
        existingProduct.price = product.price
        existingProduct.imageUrl = product.imageUrl

        return repository.save(existingProduct)
    }

    fun deleteByName(name: String): Product {
        val product = repository.findByName(name) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Product '$name' not found")
        repository.delete(product)
        return product
    }
}