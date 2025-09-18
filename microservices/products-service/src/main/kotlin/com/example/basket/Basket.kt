package com.example.basket

import jakarta.persistence.ElementCollection
import jakarta.persistence.Embeddable
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.util.UUID

@Embeddable
data class BasketItem(
    var productId: UUID,
    var productName: String,
    var quantity: Int,
    var imageUrl: String
)

@Entity
data class Basket(
    @Id @GeneratedValue(strategy = GenerationType.UUID) val id: UUID? = null,
    val sessionId: UUID,
    @ElementCollection
    var items: MutableList<BasketItem>? = mutableListOf(),
)
