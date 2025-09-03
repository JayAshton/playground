package com.example.reviews

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.util.UUID

@Entity
data class Review(
    @Id @GeneratedValue(strategy = GenerationType.UUID) val id: UUID? = null,
    var rating: Int,
    var description: String?,
    var productId: UUID,
)
