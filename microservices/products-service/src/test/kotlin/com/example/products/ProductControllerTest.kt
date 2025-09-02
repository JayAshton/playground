package com.example.products

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.eq
import org.mockito.kotlin.whenever
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@WebMvcTest(ProductController::class)
class ProductControllerTest @Autowired constructor(
    val mockMvc: MockMvc
) : BaseTest() {

    @MockitoBean
    lateinit var productService: ProductService

    private val mapper = jacksonObjectMapper()

    @Test
    fun `should update product`() {
        val update = Product(
            name = "Laptop",
            price = 1100.0,
            description = "Updated",
            imageUrl = "https://example.com/image.png"
        )

        // Mock service using Mockito-Kotlin
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
