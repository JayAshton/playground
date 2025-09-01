package com.example.products

class ProductService(private val repository: ProductRepository) {
    fun findAll(): List<Product> = repository.findAll()
}