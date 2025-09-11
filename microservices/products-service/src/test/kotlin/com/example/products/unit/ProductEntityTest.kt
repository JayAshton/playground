package com.example.products.unit

import com.example.products.BaseTest
import com.example.products.Product
import com.example.products.ProductRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import java.util.UUID

@DataJpaTest
class ProductEntityTest @Autowired constructor(
    val productRepository: ProductRepository
) : BaseTest() {
    @Test
    fun `should assign a UUID on save`() {
        val product = Product(
            name = "Product",
            price = 1000.0,
            description = "Product description",
            imageUrl = "https://example.com/image.png"
        )
        val savedProduct = productRepository.save(product)

        Assertions.assertNotNull(savedProduct.id)
        Assertions.assertTrue(savedProduct.id is UUID)
    }
}