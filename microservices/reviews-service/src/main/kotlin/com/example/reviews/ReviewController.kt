package com.example.reviews

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/reviews")
class ReviewController() {
    @GetMapping("/all")
    fun index() = "Hello"
}