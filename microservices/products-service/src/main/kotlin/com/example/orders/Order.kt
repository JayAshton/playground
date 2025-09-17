package com.example.orders

import jakarta.persistence.ElementCollection
import jakarta.persistence.Embeddable
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.util.UUID

@Embeddable
data class OrderItem(
    var productId: UUID,
    var quantity: Int
)

@Entity
data class Order(
    @Id @GeneratedValue(strategy = GenerationType.UUID) val id: UUID? = null,
    @ElementCollection
    var items: MutableList<OrderItem> = mutableListOf(),
    var paymentMethod: String? = null
)
