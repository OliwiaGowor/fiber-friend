import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

//FIXME: jedno za wysoko ma styles i dlatego nie widac
// Create Document Component
export const PatternPdf = () => {
    const fetchedData = JSON.parse(sessionStorage.getItem("patternData") ?? "");

    const renderNode = (node: any, index: number) => {
        if (node.text) {
            return <Text key={index} style={getStyleForNode(node)}>{node.text}</Text>;
        } else if (node.children) {
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

        if (node.bold) {
            return styles.textBold;
        }

        if (node.italic) {
            return styles.textItalic;
        }

        if (node.code) {
            return styles.textCode;
        }
    };

    const renderNotes = () => {
        const renderedNotes = notes.map((node: any, index: number) => renderNode(node, index));
        return <Text>{renderedNotes}</Text>
    }

    // destructure our data
    const { name, type, category, notes, photos, yarns, tools } = fetchedData;

    console.log(renderNotes())
    // define block-scope React Components to be passed into <Text>
    const Name = () => <Text>{`${name}`}</Text>;
    const Type = () => <Text>{`${type}`}</Text>;
    const Category = () => <Text>{`${category}`}</Text>;
    const Notes = () => <Text>{renderNotes()}</Text>;
    console.log(<View id="details" style={styles.body}></View>)
    return (
        <Document>
            <Page size="A4" >
                <View id="details" style={styles.body}>
                    <Text id="header" children={<Name />} />
                    <View id="ViewidedContainer">
                        <View id="leftElements">
                            <View id="sectionContainer">
                                <Text id="sectionHeader">Details</Text>
                                <View id="projectInfoContainer">
                                    <View id="attributeName"><Text>Type: </Text></View>
                                    <Text children={<Type />} />

                                    <View id="attributeName"><Text>Category: </Text></View>
                                    <Text children={<Category />} />

                                    <View id="attributeName"><Text>Start date: </Text></View>
                                    <Text>{/*pattern.startDate ? pattern.startDate : <br></br>*/}</Text>

                                    <View id="attributeName"><Text>End date: </Text></View>
                                    <Text>{/*pattern.endDate ? pattern.endDate : <br></br>*/}</Text>
                                </View>
                            </View>
                            <View id="sectionContainer">
                                <Text id="sectionHeader">Yarns</Text>
                                {/*<TabsPanelDisplay yarns={pattern.yarns ? pattern.yarns : null} />*/}
                            </View>

                        </View>
                        <View id="rightElements">
                            <View id="sectionContainer">
                                <View id="photosContainer">
                                    <Text id="sectionHeader">Photos</Text>
                                    {/*<PhotosDisplay data={pattern} />*/}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View id="wholeScreenElements">
                        <View id="sectionContainer">
                            <Text id="attributeName">Notes</Text>
                            <View id="notes"><Text children={<Notes />} /> </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>);
};

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    textBold: {
        fontWeight: 'bold',
    },
    textItalic: {
        fontStyle: "italic",
    },
    textCode: {
        fontStyle: "italic",
    },
});