package com.example.products

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/products")
class ProductController(private val productService: ProductService) {

    @GetMapping("/all")
    fun listProducts(): List<Product> = productService.findAll()

    @GetMapping("/{name}")
    fun findByName(@PathVariable name: String): Product? = productService.findByName(name)

    @PostMapping
    fun save(@RequestBody product: Product): Product = productService.save(product)
}