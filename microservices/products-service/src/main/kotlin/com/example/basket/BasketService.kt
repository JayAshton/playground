package com.example.basket

import org.springframework.stereotype.Service
import java.util.UUID

@Service
class BasketService(private val repository: BasketRepository) {
    fun findBySessionId(sessionId: UUID): Basket? = repository.findBySessionId(sessionId)

    fun new(basketItems: List<BasketItem>): Basket {
        val basket = Basket(
            sessionId = UUID.randomUUID(),
            items = basketItems as MutableList<BasketItem>?
        )
        return repository.save(basket)
    }

    fun update(sessionId: UUID, updatedItems: List<BasketItem>): Basket {
        val existingBasket = repository.findBySessionId(sessionId)
            ?: throw IllegalArgumentException("Basket not found: $sessionId")

        existingBasket.items = updatedItems.toMutableList()
        return repository.save(existingBasket)
    }

}