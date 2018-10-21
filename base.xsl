<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:include href="fragment.xsl"></xsl:include>
    <xsl:template match="/">
        <html>
            <body>
                <xsl:apply-templates select="r"/>
                <div>
                    <script src="q.js"></script>
                    <button onclick="q()">CLICK</button>
                    <div id="asy"></div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>