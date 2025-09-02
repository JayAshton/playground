package com.example.products

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

@DataJpaTest
class ProductRepositoryTest @Autowired constructor(
    val productRepository: ProductRepository
) : BaseTest() {
    @Test
    fun `should find product by name`() {
        val product = Product(name = "Phone", price = 800.0, description = "Smartphone", imageUrl = "https://example.com/image.png")
        productRepository.save(product)
        val found = productRepository.findByName("Phone")

        assertNotNull(found)
        assertEquals("Phone", found.name)
    }
}