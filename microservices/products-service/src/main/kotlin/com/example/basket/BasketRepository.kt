package com.example.basket

import com.example.products.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface BasketRepository : JpaRepository<Basket, Long> {
    fun findBySessionId(id: UUID?): Basket?
}