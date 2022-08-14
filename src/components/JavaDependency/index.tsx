import React from 'react';
import Tabs from '@docusaurus/theme-classic/lib/theme/Tabs'
import TabItem from '@docusaurus/theme-classic/lib/theme/TabItem'
import CodeBlock from '@docusaurus/theme-classic/lib/theme/CodeBlock'

export default function JavaDependency(props: any) {
    const gradleScope = props.scope !== undefined ? props.scope : 'implementation'
    const isBom = props.bom !== undefined ? props.bom : false

    // gradle - groovy
    let gradleCode = `dependencies {
    `+gradleScope+` group: '`+props.group+`', name: '`+props.name+`'
}`
    if (props.version !== undefined) {
        gradleCode = `dependencies {
    `+gradleScope+` group: '`+props.group+`', name: '`+props.name+`', version: '`+props.version+`'
}`
    }

    // gradle - kotlin
    let kotlinCode = `dependencies {
    `+gradleScope+`(group = "`+props.group+`", name = "`+props.name+`")
}`
    if (props.version !== undefined) {
        kotlinCode = `dependencies {
    `+gradleScope+`(group = "`+props.group+`", name = "`+props.name+`", version = "`+props.version+`")
}`
    }

    // maven
    let mavenCode = `<dependency>
    <groupId>`+props.group+`</groupId>
    <artifactId>`+props.name+`</artifactId>
</dependency>`
    if (props.version !== undefined) {
    mavenCode = `<dependency>
    <groupId>`+props.group+`</groupId>
    <artifactId>`+props.name+`</artifactId>
    <version>`+props.version+`</version>
</dependency>`
    }

    return (
        <React.Fragment>
            <Tabs groupId="dependency">
                <TabItem value="gradle-groovy" label={<>Gradle</>}>
                    <CodeBlock language="groovy">{gradleCode}</CodeBlock>
                </TabItem>
                <TabItem value="gradle-kotlin" label={<>Gradle - Kotlin DSL</>}>
                    <CodeBlock language="kotlin">{kotlinCode}</CodeBlock>
                </TabItem>
                <TabItem value="maven" label={<>Maven</>}>
                    <CodeBlock language="xml">{mavenCode}</CodeBlock>
                </TabItem>
            </Tabs>
        </React.Fragment>
    );
}
