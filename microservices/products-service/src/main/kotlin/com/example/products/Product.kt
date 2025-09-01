package com.example.products

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
data class Product(@Id val id: String?, val name: String)
