package com.example.products

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/all")
class ProductController(private val productService: ProductService) {
    @GetMapping()
    fun listProducts(): List<Product> = productService.findAll()
}