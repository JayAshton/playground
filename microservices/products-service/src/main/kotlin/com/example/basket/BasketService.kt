package com.example.basket

import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import org.springframework.http.HttpStatus
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
}