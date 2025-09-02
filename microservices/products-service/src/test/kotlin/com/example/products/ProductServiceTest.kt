package com.example.products

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*


class ProductServiceTest : BaseTest() {

    private val productRepository = mock(ProductRepository::class.java)
    private val productService = ProductService(productRepository)

    @Test
    fun `should update product when exists`() {
        val existing = Product(id = 1, name = "Tablet", price = 500.0, description = "Android", imageUrl = "https://example.com/image.png")
        val update = Product(name = "Tablet", price = 550.0, description = "Updated Android", imageUrl = "https://example.com/image.png")

        `when`(productRepository.findByName("Tablet")).thenReturn(existing)
        `when`(productRepository.save(any(Product::class.java))).thenAnswer { it.arguments[0] }

        val result = productService.update("Tablet", update)

        assertNotNull(result)
        assertEquals(550.0, result.price)
        assertEquals("Updated Android", result.description)
    }
}