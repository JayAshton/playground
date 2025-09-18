package com.example.products

import com.example.ProductsApplication
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.utility.DockerImageName

@ContextConfiguration(classes = [ProductsApplication::class])
open class BaseTest {

    object PostgresContainer {
        val instance: PostgreSQLContainer<*> = PostgreSQLContainer(DockerImageName.parse("postgres:17.6"))
            .apply {
                withDatabaseName("testdb")
                withUsername("test")
                withPassword("test")
                start()
            }
    }

    companion object {
        @JvmStatic
        @DynamicPropertySource
        fun registerProperties(registry: DynamicPropertyRegistry) {
            val container = PostgresContainer.instance
            registry.add("spring.datasource.url", container::getJdbcUrl)
            registry.add("spring.datasource.username", container::getUsername)
            registry.add("spring.datasource.password", container::getPassword)
        }
    }
}