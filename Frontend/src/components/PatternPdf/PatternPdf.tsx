import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Yarn } from '../../DTOs/Yarn';
import { styles } from './PatternPdfStyles';
import { OtherSupply, Pattern, Tool } from '../../DTOs/Pattern';

export const PatternPdf = () => {
    const fetchedData = JSON.parse(sessionStorage.getItem("patternData") ?? "");
    const { name, type, category, author, notes, photos, yarns, tools, otherSupplies } = fetchedData; // destructure data
    const notesArr = (new Function("return " + notes + ";")());

    const renderNode = (node: any, index: number, listType: string = '') => {
        if (listType && node.text) {
            return <Text key={index} style={getStyleForNode(node)}>{`${listType === "numbered" ? index + 1 : "\u2022"}. ${node.text}`}</Text>;
        } else if (node.text) {
            return <Text key={index} style={getStyleForNode(node)}>{`${node.text}`}</Text>;
        }

        if (node.children) {
            return (
                <Text key={index}>
                    {node.children.map((child: any, childIndex: number) => renderNode(child, childIndex))}
                </Text>
            );
        } else {
            return null;
        }
    };

    const getStyleForNode = (node: any) => {

        const style = [];

        if (node.bold) {
            style.push(styles.bold);
        }

        if (node.italic) {
            style.push(styles.italic);
        }

        if (node.underline) {
            style.push(styles.underline);
        }

        return style;
    };

    const handleBlockType = (node: any) => {
        const nodes = [];
        /* Handle node type */
        if (node.type === 'block-quote') {
            nodes.push(
                <View style={{ borderLeft: '2pt solid black', paddingLeft: '4pt' }}>
                    {node.children.map((child: any, childIndex: number) => (
                        renderNode(child, childIndex)
                    ))}
                </View>
            )
        }

        if (node.type === 'bulleted-list') {
            nodes.push(
                <View>
                    {node.children.map((child: any, childIndex: number) => (
                        renderNode(child, childIndex, "bulleted")
                    ))}
                </View>
            )
        }

        if (node.type === 'numbered-list') {
            nodes.push(
                <View>
                    {node.children.map((child: any, childIndex: number) => (
                        renderNode(child, childIndex, "numbered")
                    ))}
                </View>
            )
        }

        if (node.type === 'heading-one') {
            nodes.push(
                <Text style={{ fontSize: '20pt' }}>
                    {node.children.map((child: any, childIndex: number) => (
                        renderNode(child, childIndex)
                    ))}
                </Text>
            )
        }

        if (node.type === 'heading-two') {
            nodes.push(
                <Text style={{ fontSize: '18pt' }}>
                    {node.children.map((child: any, childIndex: number) => (
                        renderNode(child, childIndex)
                    ))}
                </Text>
            )
        }

        if (node.type === 'paragraph') {
            nodes.push(
                <Text>
                    {node.children.map((child: any, childIndex: number) => (
                        renderNode(child, childIndex)
                    ))}
                </Text>
            )
        }

        return nodes;
    }

    const renderNotes = () => {
        const renderedNotes = notesArr.map((node: any) => handleBlockType(node));

        return <Text>{renderedNotes}</Text>
    };

    const renderSupplies = (pattern: Pattern) => {
        const supplies = [];

        if (pattern.yarns) {
            supplies.push(yarns.map((yarn: Yarn) => (
                <View>
                    <Text id="sectionHeader" style={styles.smallheader}>Yarns</Text>
                    <Text style={styles.bold}>{`\u2022 ${yarn.name}`}</Text>
                    <View style={styles.supplyInfo}>
                        <View style={styles.supplyInfoColumn}>
                            <Text>Quantity: {`${yarn.quantity}`}</Text>
                            <Text >Tool Size: {`${yarn.toolSize}`}</Text>
                        </View>
                        <View style={styles.supplyInfoColumn}>
                            <Text >Stitch: {`${yarn.stitch}`}</Text>
                            <Text>Gauge: {`${yarn.gauge}`}</Text>
                        </View>
                    </View>
                </View>)
            ))
        }

        if (pattern.tools) {
            supplies.push(tools.map((tool: Tool) => (
                <View>
                    <Text id="sectionHeader" style={styles.smallheader}>Yarns</Text>
                    <Text style={styles.bold}>{`\u2022 ${tool.name}`}</Text>
                    <View style={styles.supplyInfo}>
                        <View style={styles.supplyInfoColumn}>
                            <Text>Quantity: {`${tool.quantity}`}</Text>
                            <Text >Tool Size: {`${tool.size}`}</Text>
                        </View>
                    </View>
                </View>)
            ))
        }

        if (pattern.otherSupplies) {
            supplies.push(otherSupplies.map((otherSupply: OtherSupply) => (
                <View>
                    <Text id="sectionHeader" style={styles.smallheader}>Yarns</Text>
                    <Text style={styles.bold}>{`\u2022 ${otherSupply.name}`}</Text>
                    <View style={styles.supplyInfo}>
                        <View style={styles.supplyInfoColumn}>
                            <Text>Quantity: {`${otherSupply.quantity}`}</Text>
                            <Text >Tool Size: {`${otherSupply.note}`}</Text>
                        </View>
                    </View>
                </View>)
            ))
        }

        return supplies;
    };

    //FIXME: fix url
    const Photo = () => <Image src={`data:${photos[0]?.type};base64,${photos[0]?.content}`} style={styles.photo} />;

    return (
        <Document>
            <Page size="A4" orientation='portrait' break style={styles.body}>
                <View id="details" wrap>
                    <Text id="header" style={styles.header} >{`${name}`}</Text>
                    <View id="dividedContainer" style={styles.dividedContainer}>
                        <View id="leftElements">
                            <View id="sectionContainer" style={styles.sectionContainer}>
                                <View id="photosContainer">
                                    {/*<Photo />*/}
                                </View>
                            </View>
                        </View>
                        <View id="projectInfoContainer" style={styles.projectInfoContainer}>
                            <View id="sectionContainer" style={styles.sectionContainer}>
                                <Text id="sectionHeader" style={styles.subheader}>Details</Text>
                                <Text id="attributeName">Type:
                                    <Text >{`${type}`}</Text>
                                </Text>
                                <Text id="attributeName">Category:
                                    <Text >{`${category}`}</Text>
                                </Text>
                                <Text id="attributeName">Created By:
                                    <Text >{`${author}`}</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View id="wholeScreenElements">
                        <View id="sectionContainer" style={styles.sectionContainer}>
                            <Text id="sectionHeader" style={styles.subheader}>Supplies</Text>
                            {renderSupplies(fetchedData)}
                        </View>
                        <View id="sectionContainer" style={styles.sectionContainer}>
                            <Text id="attributeName" style={styles.subheader}>Notes</Text>
                            <View id="notes">
                                <Text >{renderNotes()}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>);
};

Font.register({
    family: 'Lato',
    fonts: [
        { src: "https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHh30wWw.ttf", fontWeight: 100 },
        { src: "https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh7USew8.ttf", fontWeight: 300 },
        { src: "https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHvxk.ttf", fontWeight: 400 },
        { src: "https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVew8.ttf", fontWeight: 700 },
        { src: "https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh50Xew8.ttf", fontWeight: 900 },
        { src: "https://fonts.gstatic.com/s/lato/v24/S6u-w4BMUTPHjxsIPy-v.ttf", fontWeight: 100, fontStyle: 'italic' },
        { src: "https://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI9w2PHA.ttf", fontWeight: 300, fontStyle: 'italic' },
        { src: "https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHjxswWw.ttf", fontWeight: 400, fontStyle: 'italic' },
        { src: "https://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI5wqPHA.ttf", fontWeight: 700, fontStyle: 'italic' },
        { src: "https://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI3wiPHA.ttf", fontWeight: 900, fontStyle: 'italic' },
    ]
});