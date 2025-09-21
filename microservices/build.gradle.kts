plugins {
    kotlin("jvm") version "2.1.20" apply true
    kotlin("plugin.spring") version "1.9.25" apply false
    id("org.springframework.boot") version "3.5.5" apply false
    id("io.spring.dependency-management") version "1.1.7" apply false
    kotlin("plugin.jpa") version "1.9.25" apply false
}

subprojects {
    plugins.apply("org.jetbrains.kotlin.jvm")

    kotlin {
        jvmToolchain(21)
    }

    repositories {
        mavenCentral()
    }

    dependencies {
        add("implementation", "com.fasterxml.jackson.module:jackson-module-kotlin:2.17.2")
        add("implementation", "org.jetbrains.kotlin:kotlin-reflect:2.1.20")
        add("testImplementation", "org.jetbrains.kotlin:kotlin-test-junit5:2.1.20")
        add("testImplementation", "org.mockito.kotlin:mockito-kotlin:5.2.0")
        add("testImplementation", "io.rest-assured:rest-assured:5.5.0")
    }

    tasks.withType<Test> {
        useJUnitPlatform()
    }

    extensions.configure<org.jetbrains.kotlin.gradle.dsl.KotlinJvmProjectExtension> {
        jvmToolchain(21)
        compilerOptions {
            freeCompilerArgs.add("-Xjsr305=strict")
        }
    }
}
