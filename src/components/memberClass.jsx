import React from 'react';

const MemberClass = ({
    memberClassList, 
    onMemberClassSelect, 
    currentMemberClass,
    textProperty,
    valueProperty 
}) => {
    return (
        <ul className="list-group">
            {memberClassList.map(memberClass => (
                <li
                    key={memberClass[valueProperty]}     
                    className={
                        memberClass === currentMemberClass
                        ? "list-group-item active"
                        : "list-group-item"
                    }
                    onClick={() => onMemberClassSelect(memberClass)}
                >
                    {memberClass[textProperty]}
                </li>
            ))}
        </ul>
    )
}

MemberClass.defaultProps = {
    textProperty: "class",
    valueProperty: "_id"
}

export default MemberClass;