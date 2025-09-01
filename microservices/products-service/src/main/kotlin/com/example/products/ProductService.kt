package com.example.products

import org.springframework.stereotype.Service

@Service
class ProductService(private val repository: ProductRepository) {
    fun findAll(): List<Product> = repository.findAll()
}