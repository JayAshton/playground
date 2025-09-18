package com.example.reviews

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/review-api")
class ReviewController(private val reviewService: ReviewService) {
    @GetMapping("/all")
    fun listReviews(): List<Review> = reviewService.findAll()

    @GetMapping("/{productId}")
    fun findByProductId(@PathVariable productId: UUID): List<Review>? = reviewService.findByProductId(productId)

    @PostMapping
    fun save(@RequestBody review: Review): Review = reviewService.save(review)
}