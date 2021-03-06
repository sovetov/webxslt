<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="root">
        <html>
            <body>
                <xsl:apply-templates/>
                <div>
                    <button onclick="appendX(this.nextSibling, 'data.xml')">CLICK</button>
                    <div></div>
                </div>
                <script src="xslt.js"></script>
            </body>
        </html>
    </xsl:template>
    <xsl:template match="r">
        <h2>My CD Collection</h2>
        <table border="1">
            <tr bgcolor="#9acd32">
                <th>Title</th>
                <th colspan="2">Artist</th>
            </tr>
            <xsl:for-each select="oi">
                <tr>
                    <td>
                        <xsl:value-of select="ai"/>
                    </td>
                    <td>
                        <xsl:value-of select="bi"/>
                    </td>
                    <td>
                        <xsl:value-of select="bi/@zxc"/>
                    </td>
                </tr>
            </xsl:for-each>
        </table>
    </xsl:template>
</xsl:stylesheet>