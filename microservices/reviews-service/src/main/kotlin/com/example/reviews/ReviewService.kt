package com.example.reviews

import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import org.springframework.http.HttpStatus
import java.util.UUID

@Service
class ReviewService(private val repository: ReviewRepository) {
    fun findAll(): List<Review> =
        repository.findAll()
    fun findByProductId(productId: UUID): Review =
        repository.findByProductId(productId)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Reviews for '$productId' not found")
    fun save(review: Review): Review = repository.save(review)
}