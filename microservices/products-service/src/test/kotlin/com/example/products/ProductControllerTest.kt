package com.example.products

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.eq
import org.mockito.kotlin.whenever
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@WebMvcTest(ProductController::class)
class ProductControllerTest @Autowired constructor(
    val mockMvc: MockMvc
) : BaseTest() {

    @MockitoBean
    lateinit var productService: ProductService
    private val mapper = jacksonObjectMapper()

    @Test
    fun `should delete a single product`() {
        val product: Product = Product(
            name = "Laptop",
            price = 1100.0,
            description = "Updated",
            imageUrl = "https://example.com/image.png"
        )

        whenever(productService.deleteByName(product.name)).thenReturn(product)

        val responseBody = mockMvc.perform(
            delete("/products/${product.name}")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andReturn()
            .response
            .contentAsString

        val foundProduct: Product = mapper.readValue(responseBody)

        assertEquals(product.name, foundProduct.name)
        assertEquals(product.description, foundProduct.description)
        assertEquals(product.price, foundProduct.price)
        assertEquals(product.imageUrl, foundProduct.imageUrl)
    }

    @Test
    fun `should list a single product`() {
        val product: Product = Product(
            name = "Laptop",
            price = 1100.0,
            description = "Updated",
            imageUrl = "https://example.com/image.png"
        )

        whenever(productService.findByName(product.name)).thenReturn(product)

        val responseBody = mockMvc.perform(
            get("/products/${product.name}")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andReturn()
            .response
            .contentAsString

        val foundProduct: Product = mapper.readValue(responseBody)

        assertEquals(product.name, foundProduct.name)
        assertEquals(product.description, foundProduct.description)
        assertEquals(product.price, foundProduct.price)
        assertEquals(product.imageUrl, foundProduct.imageUrl)
    }

    @Test
    fun `should list all products`() {
        val products: List<Product> = listOf(
            Product(
                name = "Laptop",
                price = 1100.0,
                description = "Updated",
                imageUrl = "https://example.com/image.png"
            ),
            Product(
                name = "Another laptop",
                price = 1300.0,
                description = "Updated laptop",
                imageUrl = "https://example.com/image.png"
            )
        )

        whenever(productService.findAll()).thenReturn(products)

        val responseBody = mockMvc.perform(
            get("/products/all")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andReturn()
            .response
            .contentAsString

        val foundProducts: List<Product> = mapper.readValue(responseBody)

        assertEquals(2, foundProducts.size)
        foundProducts.forEachIndexed { index, product ->
            val expected = products[index]
            assertEquals(expected.name, product.name)
            assertEquals(expected.price, product.price)
            assertEquals(expected.description, product.description)
            assertEquals(expected.imageUrl, product.imageUrl)
        }
    }

    @Test
    fun `should save products`() {
        val products: List<Product> = listOf(
            Product(
                name = "Laptop",
                price = 1100.0,
                description = "Updated",
                imageUrl = "https://example.com/image.png"
            ),
            Product(
                name = "Another laptop",
                price = 1300.0,
                description = "Updated laptop",
                imageUrl = "https://example.com/image.png"
            )
        )

        products.forEach { product ->
            whenever(productService.save(any())).thenReturn(product)

            mockMvc.perform(
                post("/products")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(product))
            )
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.price").value(product.price))
                .andExpect(jsonPath("$.description").value(product.description))
                .andExpect(jsonPath("$.imageUrl").value(product.imageUrl))
        }
    }

    @Test
    fun `should update product`() {
        val update = Product(
            name = "Laptop",
            price = 1100.0,
            description = "Updated",
            imageUrl = "https://example.com/image.png"
        )

        whenever(productService.update(eq("Laptop"), any())).thenReturn(update)

        mockMvc.perform(
            put("/products/Laptop")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(update))
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.price").value(1100.0))
            .andExpect(jsonPath("$.description").value("Updated"))
            .andExpect(jsonPath("$.imageUrl").value("https://example.com/image.png"))
    }
}
