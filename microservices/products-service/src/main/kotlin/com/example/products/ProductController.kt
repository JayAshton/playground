package com.example.products

import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/products")
class ProductController(private val productService: ProductService) {

    @GetMapping("/all")
    fun listProducts(): List<Product> = productService.findAll()

    @GetMapping("/{name}")
    fun findByName(@PathVariable name: String): Product? = productService.findByName(name)

    @GetMapping("/find/{productId}")
    fun findByName(@PathVariable productId: UUID): Product? = productService.findByProductId(productId)

    @PostMapping
    fun save(@RequestBody product: Product): Product = productService.save(product)

    @PutMapping("/{name}")
    fun update(
        @PathVariable name: String,
        @RequestBody updatedProduct: Product
    ): Product = productService.update(name, updatedProduct)

    @DeleteMapping("/{name}")
    fun delete(@PathVariable name: String): Product = productService.deleteByName(name)
}