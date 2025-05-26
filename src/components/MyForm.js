import { useState } from 'react';
import './MyForm.css'

const MyForm = ({user}) => {

    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [bio, setBio] = useState(user ? user.bio : '');
    const [role, setRole] = useState(user ? user.role : '');

    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    console.log(name, email, bio, role);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Enviando formulário")
        //Limpar inputs do form
        setName("");
        setEmail("");
        setBio("");
    };
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" name="name" 
                        placeholder="Digite seu nome"
                        onChange={handleName}
                        value={name}
                    />

                    {/* Label envolvendo input */}
                    <label>
                        <span>E-mail:</span>
                        <input type="text" name="email"
                            placeholder="Digite seu nome"
                            onChange={handleEmail}
                            value={email} 
                        />
                    </label>
                    
                    <label>
                        <span>Bio:</span>
                        <textarea 
                            name="bio"
                            placeholder="Descrição da bio"
                            onChange={(e) => setBio(e.target.value)}
                            value={bio} 
                        />
                    </label>

                    <label>
                        <span>Perfil:</span>
                        <select name="role" 
                            onChange={(e) => setRole(e.target.value)}
                            value={role}>
                            <option value='user'>Usuário</option>
                            <option value='editor'>Editor</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </label>
                
                </div>
                <input type="submit" value="Enviar"/>
            </form>
        </div>
    );
}
export default MyForm;