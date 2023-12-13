import { Formik, Form, Field } from "formik";
import {
  Textarea,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Button
} from "@chakra-ui/react";

const EditDiscussion = ({ post, handleUpdate, handleCancel }) => {
    
  return (
    <Formik 
      initialValues={{ title: post.title, body: post.body }}
      onSubmit={async (values, actions) =>
          await handleUpdate(values, actions)
        }
    >
      {(props) => (
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            gap: "20px",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Field name="title">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.firstName && form.touched.firstName}
              >
                <HStack>
                  <FormLabel>Title </FormLabel>
                  <Input {...field} placeholder="title" />
                </HStack>
              </FormControl>
            )}
          </Field>
          <Field name="body">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.firstName && form.touched.firstName}
              >
                <HStack>
                  <FormLabel>Body </FormLabel>
                  <Textarea {...field} />
                </HStack>
              </FormControl>
            )}
          </Field>
          <HStack>
            <Button
              width={"50%"}
              colorScheme="pink"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Update
            </Button>
            <Button
              width={"50%"}
              colorScheme="red"
              variant={'outline'}
              onClick={handleCancel}
              type="cancel"
            >
              Cancel
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  );
};
export default EditDiscussion;
