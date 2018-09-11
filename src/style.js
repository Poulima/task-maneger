import styled from 'styled-components';

export const TaskManeger = styled.div `
  text-align: center;
  height: 100%;
  background: #2E8B57;
  height: 100vh;

  .header {
    margin: 0px;
    padding: 20px;
    color: #fff;
  }

`;

// export const ListContainer = styled.div `
//   padding: 20px;
//   height: auto;
//   display: flex;
//   align-items: flex-start;
// `;

export const AddListButton = styled.div`
  background: rgba(0,0,0,.12);
  padding: 4px 20px;
  height: 35px;
  border-radius: 4px;

  .addList {
    background: transparent;
    border: none;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    padding: 10px;
    cursor: pointer;
  }

  .plus-icon {
    color: #fff;
  }

`;

export const AddItemButton = styled.div `

   padding : 15px 0px 0px;

  .plus-icon {
    color: #444;
  }
  .addItem {
    border: none;
    padding: 6px 15px;
    background: transparent;
    font-size: 15px;
    color: #444;
    cursor: pointer;
  }
`

export const AddListSection = styled.div `
  height: auto;
  width: 230px;
  padding: 10px;
  margin: 0px 10px;
  border: none;
  background: #e2e4e6;
  border-radius: 4px;
  text-align: left;

  input[type= text] {
    margin-bottom: 10px;
    padding: 10px;
    border: none;
    border-radius: 4px;
  }

  .add {
    background: #2E8B57;
    border-radius: 4px;
    padding: 10px 20px;
    border: none;
    color: #fff;
    cursor: pointer;
  }

  .action {
    display: flex;
    align-items: center;
  }

  .cancle-btn {
    color: #444;
    padding: 0px 10px;
  }
`;

export const AddItemSection = styled.div`
  background-color: transparent;
  height: auto;


  textarea {
    padding: 10px;
    margin: 4px 0px
    width: 168px;
    border: none;
    border-radius: 4px;
    resize: none;
  }

  .add {
    background: #2E8B57;
    border-radius: 4px;
    padding: 10px 20px;
    border: none;
    color: #fff;
    cursor: pointer;

  }

  .action {
    display: flex;
    align-items: center;
  }

  .cancle-btn {
    color: #444;
    padding: 0px 10px;
  }
`;

export const ItemContainer = styled.ul `
  display: flex;
  flex-direction: column;
  padding: 0px;
  list-style: none;
`;

export const EachListContainer = styled.ul `
  display: flex;
  margin: 0px;
  padding: 0px;
  list-style: none;
  align-items: flex-start;

  .eachItem {
    background: #fff;
    padding: 10px 6px;
    margin: 5px 0px;
    border-radius: 4px;
    box-shadow: 0 1px 0 #ccc;
  }

  .editItem {
    padding: 10px;
    margin: 4px 0px
    width: 168px;
    border-radius: 4px;
    resize: none;
  }

  .add {
    background: #2E8B57;
    border-radius: 4px;
    padding: 6px 15px;
    border: none;
    color: #fff;
    cursor: pointer;

  }
`;

export const ActionButton = styled.span `
  float: right;

  i {
    color: #444;
    margin: 0px 4px;
  }
`;
