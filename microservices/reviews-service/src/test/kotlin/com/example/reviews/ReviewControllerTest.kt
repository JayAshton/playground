package com.example.reviews

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.whenever
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import java.util.UUID
import kotlin.collections.forEach

@WebMvcTest(ReviewController::class)
class ReviewControllerTest @Autowired constructor(
    val mockMvc: MockMvc
) : BaseTest() {

    @MockitoBean
    lateinit var reviewService: ReviewService
    private val mapper = jacksonObjectMapper()

    @Test
    fun `should list all reviews`() {
        val reviews: List<Review> = listOf(
            Review(
                rating = 1,
                description = "Updated",
                productId = UUID.randomUUID()
            ),
            Review(
                rating = 5,
                description = "Review desc",
                productId = UUID.randomUUID()
            )
        )

        whenever(reviewService.findAll()).thenReturn(reviews)

        val responseBody = mockMvc.perform(
            get("/review-api/all")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andReturn()
            .response
            .contentAsString

        val foundReviews: List<Review> = mapper.readValue(responseBody)

        assertEquals(2, foundReviews.size)
        foundReviews.forEachIndexed { index, review ->
            val expected = reviews[index]
            assertEquals(expected.rating, review.rating)
            assertEquals(expected.description, review.description)
            assertEquals(expected.productId, review.productId)
        }
    }

    @Test
    fun `should list reviews by product id`() {
        val productId = UUID.randomUUID()
        val reviews: List<Review> = listOf(
            Review(
                rating = 1,
                description = "Updated",
                productId = productId
            ),
            Review(
                rating = 3,
                description = "Updated desc",
                productId = productId
            )
        )

        whenever(reviewService.findByProductId(productId)).thenReturn(reviews)
        val responseBody = mockMvc.perform(
            get("/review-api/${productId}")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andReturn()
            .response
            .contentAsString
        4
        val foundReviews: List<Review> = mapper.readValue(responseBody)

        assertEquals(2, foundReviews.size)
        foundReviews.forEachIndexed { index, review ->
            val expected = reviews[index]
            assertEquals(expected.rating, review.rating)
            assertEquals(expected.description, review.description)
            assertEquals(expected.productId, review.productId)
        }
    }

    @Test
    fun `should save review`() {
        val reviews: List<Review> = listOf(
            Review(
                rating = 1,
                description = "Updated",
                productId = UUID.randomUUID()
            ),
            Review(
                rating = 3,
                description = "Updated desc",
                productId = UUID.randomUUID()
            )
        )

        reviews.forEach { review ->
            whenever(reviewService.save(any())).thenReturn(review)

            mockMvc.perform(
                post("/review-api")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(review))
            )
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.rating").value(review.rating))
                .andExpect(jsonPath("$.description").value(review.description))
                .andExpect(jsonPath("$.productId").value(review.productId.toString()))
        }
    }
}
