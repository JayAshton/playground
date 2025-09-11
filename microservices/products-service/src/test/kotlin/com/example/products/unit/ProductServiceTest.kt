package com.example.products.unit

import com.example.products.BaseTest
import com.example.products.Product
import com.example.products.ProductRepository
import com.example.products.ProductService
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers
import org.mockito.Mockito
import java.util.UUID
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

class ProductServiceTest : BaseTest() {

    private val productRepository = Mockito.mock(ProductRepository::class.java)
    private val productService = ProductService(productRepository)

    @Test
    fun `should update product when exists`() {
        val existing = Product(
            id = UUID.randomUUID(),
            name = "Tablet",
            price = 500.0,
            description = "Android",
            imageUrl = "https://example.com/image.png"
        )
        val update = Product(
            name = "Tablet",
            price = 550.0,
            description = "Updated Android",
            imageUrl = "https://example.com/image.png"
        )

        Mockito.`when`(productRepository.findByName("Tablet")).thenReturn(existing)
        Mockito.`when`(productRepository.save(ArgumentMatchers.any(Product::class.java))).thenAnswer { it.arguments[0] }

        val result = productService.update("Tablet", update)

        assertNotNull(result)
        assertEquals(550.0, result.price)
        assertEquals("Updated Android", result.description)
    }
}