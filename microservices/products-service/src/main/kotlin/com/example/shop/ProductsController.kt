package com.example.shop

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import com.example.shop.com.example.shop.Product

@RestController
@RequestMapping("/")
class ProductsController {
    @GetMapping()
    fun listProducts() = listOf(
        Product("1", "Hello!"),
        Product("2", "Bonjour!"),
        Product("3", "Privet!"),
    )
}