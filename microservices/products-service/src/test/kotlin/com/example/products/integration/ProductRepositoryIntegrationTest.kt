package com.example.products.integration

import com.example.products.BaseTest
import com.example.products.Product
import com.example.products.ProductRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull

@DataJpaTest
class ProductRepositoryIntegrationTest @Autowired constructor(
    val productRepository: ProductRepository
) : BaseTest() {

    @Test
    fun `should persist and retrieve product`() {
        val product = Product(
            name = "Product",
            price = 1000.0,
            description = "Product description",
            imageUrl = "https://example.com/image.png"
        )
        val savedProduct = productRepository.save(product)
        val foundProduct: Product? = productRepository.findById(savedProduct.id)

        assertEquals(product.name, foundProduct?.name)
        assertEquals(product.description, foundProduct?.description)
        assertEquals(product.price, foundProduct?.price)
        assertEquals(product.imageUrl, foundProduct?.imageUrl)
    }

    @Test
    fun `should handle nullable description and imageUrl`() {
        val product = Product(
            name = "Nullable Product",
            price = 99.99,
            description = null,
            imageUrl = null
        )
        val saved = productRepository.save(product)
        val found = productRepository.findById(saved.id)

        assertNotNull(found)
        assertEquals("Nullable Product", found.name)
        assertNull(found.description)
        assertNull(found.imageUrl)
    }

    @Test
    fun `should find nothing when product name does not exist`() {
        val found = productRepository.findByName("DoesNotExist")
        assertNull(found, "Expected no product with that name")
    }

    @Test
    fun `should update existing product`() {
        val product = Product(
            name = "Old Name",
            price = 10.0,
            description = "Old description",
            imageUrl = null
        )
        val savedProduct = productRepository.save(product)

        savedProduct.name = "New Name"
        savedProduct.price = 20.0
        savedProduct.description = "Updated description"
        savedProduct.imageUrl = "https://example.com/new.png"
        val updatedProduct = productRepository.save(savedProduct)
        val foundProduct = productRepository.findById(updatedProduct.id)

        assertNotNull(foundProduct)
        assertEquals("New Name", foundProduct.name)
        assertEquals(20.0, foundProduct.price)
        assertEquals("Updated description", foundProduct.description)
        assertEquals("https://example.com/new.png", foundProduct.imageUrl)
    }

    @Test
    fun `should find product by name`() {
        val product = Product(
            name = "Phone",
            price = 800.0,
            description = "Smartphone",
            imageUrl = "https://example.com/image.png"
        )
        productRepository.save(product)
        val found = productRepository.findByName("Phone")

        assertNotNull(found)
        assertEquals("Phone", found.name)
    }
}