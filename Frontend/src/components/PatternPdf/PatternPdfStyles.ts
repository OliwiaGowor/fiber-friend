import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        backgroundColor: '#f7ede2',
        fontFamily: 'Lato',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: 1.5,
    },
    header: {
        fontSize: 34,
        bold: true,
        alignContent: "center",
        alignSelf: "center",
        marginBottom: 30,
    },
    subheader: {
        fontSize: 22,
        bold: true,
        marginBottom: 10,
    },
    smallheader: {
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 5,
    },
    bold: {
        fontWeight: 700,
    },
    italic: {
        fontStyle: "italic",
    },
    underline: {
        textDecoration: "underline",
    },
    dividedContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 20,
    },
    sectionContainer: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    projectInfoContainer: {
        width: "70%",
    },
    supplyInfo: {
        display: "flex",
        flexDirection: "row",
    },
    supplyInfoColumn: {
        width: "50%",
    },
});