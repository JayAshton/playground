package com.example.products

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest

@DataJpaTest
class ProductEntityTest @Autowired constructor(
    val productRepository: ProductRepository
) : BaseTest() {

    @Test
    fun `should persist and retrieve product`() {
        val product = Product(
            name = "Product",
            price = 1000.0,
            description = "Product description",
            imageUrl = "https://exmaple.com/image.png"
        )
        val savedProduct = productRepository.save(product)
        val foundProduct: Product? = productRepository.findByName(savedProduct.name)

        assertEquals(product.name, foundProduct?.name)
        assertEquals(product.description, foundProduct?.description)
        assertEquals(product.price, foundProduct?.price)
        assertEquals(product.imageUrl, foundProduct?.imageUrl)
    }
}
