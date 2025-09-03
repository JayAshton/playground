package com.example.reviews

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface ReviewRepository : JpaRepository<Review, Long> {
    fun findByProductId(productId: UUID): Review?
}