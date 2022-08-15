import React from 'react';
import Tabs from '@docusaurus/theme-classic/lib/theme/Tabs'
import TabItem from '@docusaurus/theme-classic/lib/theme/TabItem'
import CodeBlock from '@docusaurus/theme-classic/lib/theme/CodeBlock'

function getGradleDependency(group: any, name: any, version: any) {
    if (version !== undefined) {
        return group+':'+name+':'+version
    }

    return group+':'+name
}

function getGradleGroovyDep(props: any) {
    const gradleScope = props.scope !== undefined ? props.scope : 'implementation'
    const isBom = props.bom !== undefined ? props.bom : false

    let code = `dependencies {\n`
    if (isBom == false) {
        code = code + `    ` + gradleScope+` '`+getGradleDependency(props.group, props.name, props.version)+`'\n`
    } else {
        code = code + `    ` + gradleScope+` platform('`+getGradleDependency(props.group, props.name, props.version)+`')\n`
    }
    code = code + `}`

    return code
}

function getGradleKotlinDSLDep(props: any) {
    const gradleScope = props.scope !== undefined ? props.scope : 'implementation'
    const isBom = props.bom !== undefined ? props.bom : false

    let code = `dependencies {\n`
    if (isBom == false) {
        code = code + `    ` + gradleScope+`("`+getGradleDependency(props.group, props.name, props.version)+`")\n`
    } else {
        code = code + `    ` + gradleScope+`(platform("`+getGradleDependency(props.group, props.name, props.version)+`"))\n`
    }
    code = code + `}`

    return code
}

function getMavenDep(props: any) {
    const isBom = props.bom !== undefined ? props.bom : false

    let code = ``
    if (isBom == false) {
        code = code + `<dependency>\n`
        code = code + `    <groupId>`+props.group+`</groupId>\n`
        code = code + `    <artifactId>`+props.name+`</artifactId>\n`
        if (props.version !== undefined) {
            code = code + `    <version>`+props.version+`</version>\n`
        }
        code = code + `</dependency>\n`
    } else {
        code = code + `<dependencyManagement>\n`
        code = code + `    <dependencies>\n`
        code = code + `        <dependency>\n`
        code = code + `            <groupId>`+props.group+`</groupId>\n`
        code = code + `            <artifactId>`+props.name+`</artifactId>\n`
        if (props.version !== undefined) {
            code = code + `            <version>`+props.version+`</version>\n`
        }
        code = code + `            <type>pom</type>\n`
        code = code + `            <scope>import</scope>\n`
        code = code + `        </dependency>\n`
        code = code + `    </dependencies>\n`
        code = code + `</dependencyManagement>\n`
    }

    return code
}

export default function JavaDependency(props: any) {
    let titleSuffix = props.title !== undefined ? ' - ' + props.title : ''

    // gradle - groovy
    let gradleCode = getGradleGroovyDep(props)

    // gradle - kotlin
    let kotlinCode = getGradleKotlinDSLDep(props)

    // maven
    let mavenCode = getMavenDep(props)

    return (
        <React.Fragment>
            <Tabs groupId="dependency">
                <TabItem value="gradle-groovy" label={<>Gradle</>}>
                    <CodeBlock language="groovy" title={'build.gradle' + titleSuffix}>{gradleCode}</CodeBlock>
                </TabItem>
                <TabItem value="gradle-kotlin" label={<>Gradle - Kotlin DSL</>}>
                    <CodeBlock language="kotlin" title={'build.gradle.kts' + titleSuffix}>{kotlinCode}</CodeBlock>
                </TabItem>
                <TabItem value="maven" label={<>Maven</>}>
                    <CodeBlock language="xml" title={'pom.xml' + titleSuffix}>{mavenCode}</CodeBlock>
                </TabItem>
            </Tabs>
        </React.Fragment>
    );
}
