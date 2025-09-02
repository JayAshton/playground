package com.example.products

import com.example.ProductsApplication
import org.springframework.test.context.ContextConfiguration

@ContextConfiguration(classes = [ProductsApplication::class])
open class BaseTest