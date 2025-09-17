package com.example.products.api

import com.example.products.Product
import net.datafaker.Faker
import io.restassured.RestAssured
import io.restassured.http.ContentType
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Tag
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertNotNull
import kotlin.test.assertEquals

@Tag("api")
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
            name = faker.commerce().productName() + faker.number().randomNumber(5),
            description = faker.lorem().sentence(),
            price = faker.commerce().price().toDouble(),
            imageUrl = faker.internet().image(600, 400)
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
