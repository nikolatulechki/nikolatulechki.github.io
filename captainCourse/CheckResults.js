function GetQuestionNumbers() {
    var QuestionNumber = document.URL;

    if (QuestionNumber.lastIndexOf("/") != -1)
        QuestionNumber = QuestionNumber.substring(QuestionNumber.lastIndexOf("/") + 1, QuestionNumber.lastIndexOf("-"));
    else
        QuestionNumber = QuestionNumber.substring(QuestionNumber.lastIndexOf("\\") + 1, QuestionNumber.lastIndexOf("-"));

    return QuestionNumber;
}

function CheckResults() {
    var string_CheckAllAnswersResult = CheckAllAnswers();

    if (string_CheckAllAnswersResult != "-")
        alert("Не сте отговорили на следните въпрос(и): \n\r\n\r" + string_CheckAllAnswersResult + "\n\r Въпросите са отбелязани в червено.");
    else {
        var string_RightAnswers = CheckRightAnswers();
        if (string_RightAnswers != "-")
            alert("Задали сте грешни отговори на следните въпроси: \n\r\n\r" + string_RightAnswers + "\n\r Моля прегледайте си отговорите още веднъж.");
        else
            alert("Всички Ваши отговори са верни.");
    }
}

function CheckAllAnswers() {
    var result = "-";
    var int_CurrentQuestion = 1;

    var boolean_CurrentQuestionHasAnswer = false;

    var int_CurrentElement = 0;
    var string_CurrentElementID = "";
    var string_NextElementrID = "";

    var int_CurrentQuestion = GetQuestionNumbers();
    while (int_CurrentElement < document.getElementsByTagName("input").length) {
        try {
            string_CurrentElementID = document.getElementsByTagName("input")[int_CurrentElement].name;
        }
        catch (err) { }
        try {
            string_NextElementrID = document.getElementsByTagName("input")[int_CurrentElement + 1].name;
        }
        catch (err) {
            string_NextElementrID = "-";
        }

        if (document.getElementsByTagName("input")[int_CurrentElement].checked == true)
            boolean_CurrentQuestionHasAnswer = true; //Ako imame otgovor go zapisvame

        if (string_CurrentElementID != string_NextElementrID) {
            if (boolean_CurrentQuestionHasAnswer == true) {
                document.getElementsByTagName("input")[int_CurrentElement].parentNode.style.backgroundColor = "";
            }
            else {
                result = result.replace("-", "") + int_CurrentQuestion + "\n\r";

                document.getElementsByTagName("input")[int_CurrentElement].parentNode.style.backgroundColor = "red";
            }

            boolean_CurrentQuestionHasAnswer = false;
            int_CurrentQuestion++;
        }

        int_CurrentElement = int_CurrentElement + 1; //Minavam na sledva6tiq vapros
    }

    return result;
}
function CheckRightAnswers() {
    var result = "-";

    var int_CurrentQuestion = GetQuestionNumbers();
    var int_CurrentElement = 0;
    while (int_CurrentElement < document.getElementsByTagName("input").length) {
        try {
            if ((document.getElementsByTagName("input")[int_CurrentElement].getAttribute("Answer") == "true")) {
                document.getElementsByTagName("input")[int_CurrentElement].style.backgroundColor = "green";

                if (document.getElementsByTagName("input")[int_CurrentElement].checked == false)
                    result = result.replace("-", "") + int_CurrentQuestion + "\n\r";
                int_CurrentQuestion++;
            }
        }
        catch (err) { alert(err); }

        int_CurrentElement++;
    }

    return result;
}

function MarkAllAnswers() {
    var int_CurrentElement = 0;
    while (int_CurrentElement < document.getElementsByTagName("input").length) {
        if ((document.getElementsByTagName("input")[int_CurrentElement].getAttribute("Answer") == "true"))
        {
            document.getElementsByTagName("input")[int_CurrentElement].style.backgroundColor = "green";
            document.getElementsByTagName("input")[int_CurrentElement].checked = true;
            }

        int_CurrentElement++;
    }
}