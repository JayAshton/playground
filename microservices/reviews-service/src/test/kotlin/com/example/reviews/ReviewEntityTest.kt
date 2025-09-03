package com.example.reviews

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import java.util.UUID

@DataJpaTest
class ReviewEntityTest @Autowired constructor(
    val reviewRepository: ReviewRepository
) : BaseTest() {
    @Test
    fun `should assign a UUID on save`() {
        val review = Review(
            rating = 2,
            description = "Review description",
            productId = UUID.randomUUID(),
        )
        val savedReview = reviewRepository.save(review)

        assertNotNull(savedReview.id)
        assertTrue(savedReview.id is UUID)
    }
}
