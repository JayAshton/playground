package com.example.products

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface ProductRepository : JpaRepository<Product, Long> {
    fun findByName(name: String): Product?
    fun findById(id: UUID?): Product?
}