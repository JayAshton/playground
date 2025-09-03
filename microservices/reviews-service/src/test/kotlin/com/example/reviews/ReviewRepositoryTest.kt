package com.example.reviews

import org.junit.jupiter.api.Assertions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull

@DataJpaTest
class ReviewRepositoryTest @Autowired constructor(
    val reviewRepository: ReviewRepository
) : BaseTest() {
    @Test
    fun `should find review by product id`() {
        val review = Review(
            rating = 2,
            description = "Review description",
            productId = UUID.randomUUID(),
        )
        val savedReview = reviewRepository.save(review)
        val foundReview = reviewRepository.findByProductId(savedReview.productId)?.first()

        assertNotNull(foundReview)
        assertEquals(review.rating, foundReview.rating)
        assertEquals(review.description, foundReview.description)
        assertEquals(review.productId, foundReview.productId)
    }
}