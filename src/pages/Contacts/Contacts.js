import {Layout, Table} from "antd";
import {useEffect, useState} from "react";
import {fetchContacts} from "../../apis/contactsService";

const dataSource = [
    {
        key: '1',
        name: 'Jhonata',
        email: 'jhonata.sobrinho@hotmail.com',
        whatsapp: '5514991766309',
    },
    {
        key: '2',
        name: 'Joice',
        email: 'joicemfonseca@hotmail.com',
        whatsapp: '5514996628639',
    },
];

const columns = [
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Ação',
        key: 'action',
        render: ({whatsapp}) => (
            <a href={`https://api.whatsapp.com/send?phone=${whatsapp}`}>Enviar whatsapp para {whatsapp}</a>
        )
    }
];

const Contacts = () => {

    const [contacts, setContacts] = useState();

    const onChange = (record, selected, selectedRows) => console.log(record, selected, selectedRows)

    useEffect(() => {
        (async function getContacts() {
            const fetchedContacts = await fetchContacts();
            const finalContacts = fetchedContacts.map((contact) => ({...contact, key: contact.id}));
            setContacts(finalContacts);
        })();
    }, []);

    return <Layout>
        <br/>
        <h1>Lista de contatos</h1>
        <Table dataSource={contacts}
               columns={columns}
               rowSelection={{ onChange: onChange}}
        />
    </Layout>
}

export default Contacts;