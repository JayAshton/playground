package com.example.products.api

import com.example.products.Product
import com.github.javafaker.Faker
import io.restassured.RestAssured
import io.restassured.http.ContentType
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertNotNull
import kotlin.test.assertEquals

class ProductApiTest {

    companion object {
        private val faker = Faker()
        @BeforeAll
        @JvmStatic
        fun setup() {
            RestAssured.baseURI = "http://localhost/products"
            RestAssured.port = 80
            RestAssured.enableLoggingOfRequestAndResponseIfValidationFails()
        }
    }

    @Test
    fun `should create and fetch a product`() {
        val product = Product(
            name = faker.commerce().productName() + faker.number().randomNumber(5, false),
            description = faker.lorem().sentence(),
            price = faker.commerce().price().toDouble(),
            imageUrl = "https://placehold.co/600x400"
        )

        val response = RestAssured.given()
            .contentType(ContentType.JSON)
            .body(product)
            .`when`()
            .post()
            .then()
            .statusCode(200).extract().`as`(Product::class.java)

        assertNotNull(response)
        assertNotNull(response.id)
        assertEquals(product.name, response.name)
        assertEquals(product.description, response.description)
        assertEquals(product.price, response.price)
        assertEquals(product.imageUrl, response.imageUrl)

        val getResponse = RestAssured.given()
            .`when`()
            .get("/${product.name}")
            .then()
            .statusCode(200).extract().`as`(Product::class.java)

        assertNotNull(response)
        assertNotNull(response.id)
        assertEquals(product.name, getResponse.name)
        assertEquals(product.description, getResponse.description)
        assertEquals(product.price, getResponse.price)
        assertEquals(product.imageUrl, getResponse.imageUrl)
    }
}
