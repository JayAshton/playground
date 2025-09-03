package com.example.reviews

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*
import java.util.UUID


class ReviewServiceTest : BaseTest() {

    private val reviewRepository = mock(ReviewRepository::class.java)
    private val reviewService = ReviewService(reviewRepository)

    @Test
    fun `should create a review`() {
        val review = Review(
            rating = 2,
            description = "Review description",
            productId = UUID.randomUUID(),
        )
        `when`(reviewRepository.save(any(Review::class.java))).thenAnswer { it.arguments[0] }

        val savedReview = reviewService.save(review)
        assertNotNull(savedReview)
        assertEquals(savedReview.rating, review.rating)
        assertEquals(savedReview.description, review.description)
        assertEquals(savedReview.productId, review.productId)
    }
}