package com.example.basket

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/basket-api")
class BasketController(private val basketService: BasketService) {

    @GetMapping()
    fun open(@RequestParam sessionId: UUID): Basket? = basketService.findBySessionId(sessionId)

    @PostMapping("/new")
    fun new(@RequestBody basketItem: List<BasketItem>): Basket = basketService.new(basketItem)
}